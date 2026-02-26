const k = '3a1TCa3j8CLf32e56UrAaSbkU2Nssenb';
const run = async () => {
    try {
        const r = await fetch('https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=stop_area:IDFM:66009&to=stop_area:IDFM:474151&min_nb_journeys=1', { headers: { 'apiKey': k } });
        const d = await r.json();
        if (d.journeys) {
            d.journeys[0].sections.forEach(s => {
                if (s.stop_date_times) {
                    s.stop_date_times.forEach(st => {
                        if (st.stop_point.name.includes("Nord") || st.stop_point.name.includes("Magenta") || st.stop_point.name.includes("Châtelet")) {
                            console.log(st.stop_point.name, st.stop_point.id);
                        }
                    });
                }
            });
        }
    } catch (e) {
        console.log("Error", e.message);
    }
};
run();
