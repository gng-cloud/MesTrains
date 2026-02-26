const k='3a1TCa3j8CLf32e56UrAaSbkU2Nssenb';
const q=async (f,t,name)=>{
    try {
        const r=await fetch(`https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=stop_area:IDFM:${f}&to=stop_area:IDFM:${t}&min_nb_journeys=1`, {headers:{'apiKey':k}});
        const d=await r.json();
        console.log(name, f,'->',t, d.journeys ? d.journeys.length+' journeys': (d.error ? d.error.id : 'unknown error'));
        if(d.journeys) {
            console.log('  Route:', d.journeys[0].sections.filter(s=>s.type==='public_transport').map(s=>s.display_informations?`${s.display_informations.network} ${s.display_informations.code||''}`:'?').join(' + '));
        }
    } catch(e) {
        console.log(name, 'error', e.message);
    }
};

const run = async () => {
    // La defense: 71517
    await q('478733','71517','Magenta(478733)->LaDef(71517)');
    await q('71410','71517','GND(71410)->LaDef(71517)');
    await q('411263','71517','Magenta(411263)->LaDef(71517)');
    await q('72445','71517','Magenta_Pantin(72445)->LaDef(71517)');
    await q('480615','71517','Magenta_Lafayette(480615)->LaDef(71517)');
    
    // Test what happens if we use RER E UIC
    const r=await fetch(`https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=stop_area:SNCF:8727146&to=stop_area:IDFM:71517&min_nb_journeys=1`, {headers:{'apiKey':k}});
    const d=await r.json();
    console.log('SNCF Magenta(8727146)->LaDef(71517)', d.journeys ? d.journeys.length+' journeys': (d.error?d.error.id:'unk'));
    
    // Testing La Defense global
    console.log("Done");
};
run();
