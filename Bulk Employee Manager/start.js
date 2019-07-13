let _modPath,
	_scope = GetRootScope(),
	_controller = null

const debug = function () {
	console.log(
		`[${moment().format('HH:mm:ss')}] [Bulk Employee Manager] `,
		...arguments
	)
}

const _confirmCancel = (message, confirmCallback, cancelCallback) => {

	let cancelButton = null
	let cancelCallbackWrapper = null
	// We need to prevent event handler leaking, so make sure to remove the event handler when finished
	const confirmCallbackWrapper = function () {
		if (confirmCallback)
			confirmCallback()
		if (cancelButton)
			cancelButton.removeEventListener("click", cancelCallbackWrapper, false)
	}

	// confirm dialog, first param is unused, second is message, and third is callback *on confirm*
	_scope.confirm(null, message, confirmCallbackWrapper)
	// On the very next tick, the button should be available, so grab it and hook the click event
	setTimeout(() => {
		cancelButton = document.getElementById("cancel-button")
		if (!cancelButton) {
			debug("Failed to get Confirm Dialog's cancel button. Woops.")
			return;
		}

		// We need to prevent event handler leaking, so make sure to remove the event handler when finished
		cancelCallbackWrapper = function () {
			if (cancelCallback)
				cancelCallback(...arguments)
			cancelButton.removeEventListener("click", cancelCallbackWrapper, false)
		}

		cancelButton.addEventListener("click", cancelCallbackWrapper, false)
	}, 0)
}

const pauseTime = () => {
	if (_scope.settings.paused)
		return () => {}

	Game.Lifecycle.PauseTime(true)
	Helpers.SafeApply()
	return () => {
		Game.Lifecycle.PauseTime(true)
		Helpers.SafeApply()
	}
}

const updateTotalSalaryBonus = controller => {
	let employeesThatCanBePaid = 0
	controller.employeeBonusTotal = 0
	for (const employee of Helpers.GetAllEmployees(true)) {
		const bonusCanBePaid = _scope.daysPlayed - employee.lastBonusDay > 30 || !employee.lastBonusDay
		if (bonusCanBePaid) {
			if (employee.mood >= controller.minimumEmployeeMoodForBonus)
				continue;

			controller.employeeBonusTotal += Math.round((100 - employee.mood) * employee.salary / 100)
			employeesThatCanBePaid++
		}
	}
	return employeesThatCanBePaid;
}

const payEmployees = (totalSum) => {
	_scope.settings.balance -= totalSum
	_scope.addTransaction("Bulk Paid Employee Bonuses", -totalSum)

	for (const employee of Helpers.GetAllEmployees(true)) {
		const bonusCanBePaid = _scope.daysPlayed - employee.lastBonusDay > 30 || !employee.lastBonusDay
		if (bonusCanBePaid) {
			if (employee.mood >= _controller.minimumEmployeeMoodForBonus)
				continue;
			employee.mood = 100
			employee.lastBonusDay = _scope.daysPlayed
		}
	}

	_scope.$broadcast(Enums.GameEvents.EmployeeChange)
}

exports.initialize = modPath => {
	_modPath = modPath

	exports.views = [{
		name: 'bem',
		viewPath: _modPath + 'BulkEmployeeManagerView.html',
		// ~~Needs to be called $rootScope, used internally...?~~
		// I don't even know anymore.... what?
		// Can't be an arrow function, because it causes an error... stupid game.
		controller: ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {
			_controller = this

			this.totalEmployees = Helpers.GetAllEmployees().length
			this.employeeBonusTotal = 0

			this.minimumEmployeeMoodForBonus = _scope.settings.BulkEmployeeManager.minimumEmployeeMoodForBonus || 75;
			this.minimumEmployeeMoodForBonusOptions = {
				floor: 1,
				ceil: 100,
				value: 75,
				interval: 500,
				translate(value) {
					return `${value}%`
				},
				onChange: (id, value) => {
					this.minimumEmployeeMoodForBonus = value;
					this.employeesToPay = updateTotalSalaryBonus(this)
					this.canEmployeeBonusBePaid = this.employeesToPay > 0
				},
				onEnd(id, value) {
					this.minimumEmployeeMoodForBonus = value;
					this.employeesToPay = updateTotalSalaryBonus(this)
					this.canEmployeeBonusBePaid = this.employeesToPay > 0
					_scope.settings.BulkEmployeeManager.minimumEmployeeMoodForBonus = value;
					Helpers.SafeApply()
				}
			}

			// The slider doesn't render correctly initially, possibly because the initial value isn't available somehow
			// So via forcing it to re-render, presumably on the next tick, it now displays correctly.
			$timeout(function () {
				$scope.$broadcast("rzSliderForceRender")
			})

			this.employeesToPay = updateTotalSalaryBonus(this)
			this.canEmployeeBonusBePaid = this.employeesToPay > 0

			this.payBonuses = () => {
				const resumeTime = pauseTime()

				_confirmCancel(`Are you sure you wish to pay ${this.employeesToPay} employees a total of ${numeral(this.employeeBonusTotal).format(Configuration.CURRENCY_FORMAT)}?`, () => {
					payEmployees(this.employeeBonusTotal)
					resumeTime()
					_scope.closeAllUi()
					_controller = null
				}, () => {
					resumeTime()
					_scope.closeAllUi()
					_controller = null
				})
			}
		}],
	}, ]

	Modding.setMenuItem({
		name: 'bem',
		tooltip: 'Bulk Employee Manager',
		tooltipPosition: 'top',
		faIcon: 'fa-user-plus',
	})
}

exports.onLoadGame = settings => {
	if (!settings.BulkEmployeeManager) {
		settings.BulkEmployeeManager = {
			minimumEmployeeMoodForBonus: 75
		}
	}
}

exports.onNewDay = settings => {
	if (_controller) {
		// TODO: Check to see if any employees can be sent home
	}
}

exports.onNewHour = settings => {
	if (_controller) {
		// Don't process the time machine!
		if (Game.timeMachineActive && settings.date.getHours() !== 7)
			return;
		_controller.totalEmployees = Helpers.GetAllEmployees().length
		_controller.employeesToPay = updateTotalSalaryBonus(_controller)
		_controller.canEmployeeBonusBePaid = _controller.employeesToPay > 0
	}
}
