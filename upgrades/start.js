let _modPath;

exports.initialize = (modPath) => {
	_modPath = modPath;
	
	//Setting the multiplier for efficiency upgrades to 1, so the costs won't increase
	Helpers.GetEffiencyMultipler=e=>1;
	
	//Setting the amount of progress an upgrade does
	EmployeeRunners.Completed[Enums.EmployeeTypeNames.LeadDeveloper]=((e,t,n)=>{
		let r,o=null!=n.type;
		if(o){
			if(null==(r=e.settings.featureInstances.find(e=>e.id==n.instanceId)))
				return;
			if(e.settings.xp+=2*Helpers.CalculateComponentProductionHours(r),n.type==Enums.FeatureProperties.Efficiency){
				if(r.efficiency.current>=r.efficiency.max)
					return void(t.task=null);
				var maxinc=r.efficiency.max*0.20;
				var newinc=Math.floor(Math.random()*maxinc)+1;
				if(newinc+r.efficiency.current>r.efficiency.max)
					newinc=r.efficiency.max-r.efficiency.current;
				r.efficiency.current+=newinc;
			}else{
				if(r.quality.current>=r.quality.max)
					return void(t.task=null);
				var maxinc=r.quality.max*0.20;
				var newinc=Math.floor(Math.random()*maxinc)+1;
				if(newinc+r.quality.current>r.quality.max)
					newinc=r.quality.max-r.quality.current;
				r.quality.current+=newinc;
			}
		}else e.settings.inventory[n.module.name]=(e.settings.inventory[n.module.name]||0)+1,e.settings.xp+=2*Helpers.CalculateComponentProductionHours(n.module),e.$broadcast(Enums.GameEvents.InventoryChange);if(PlaySound(Sounds.produce),n.autoRepeat&&GetManagerWorkstationByEmployeeId(t.id)){let t=o?Helpers.GetInstanceMultiplier(r,n.type):n.module.requirements;Object.keys(t).every(n=>(e.settings.inventory[n]||0)>=t[n])?(Object.keys(t).forEach(n=>{e.settings.inventory[n]-=t[n]}),n.state=Enums.TaskStates.Running):n.state=Enums.TaskStates.Stalled}else t.task=null})
}