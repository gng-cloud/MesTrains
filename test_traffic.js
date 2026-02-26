const k = '3a1TCa3j8CLf32e56UrAaSbkU2Nssenb';

async function test(lineId, name) {
    try {
        const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/line_reports?filter=${lineId}`;
        const r = await fetch(url, { headers: { 'apikey': k } });
        const d = await r.json();
        console.log(`--- ${name} (${lineId}) ---`);
        console.log('Disruptions found:', d.disruptions ? d.disruptions.length : 0);
        if (d.disruptions && d.disruptions.length > 0) {
            d.disruptions.forEach((dis, i) => {
                const msg = dis.messages ? dis.messages[0].text : 'No message';
                console.log(`[${i}] ${dis.status} - Severity: ${dis.severity.name}`);
                console.log(`    Message: ${msg}`);
            });
        } else {
            console.log('No current disruptions.');
        }
    } catch (e) {
        console.error(e);
    }
}

async function run() {
    await test('line:IDFM:C01742', 'RER A');
    await test('line:IDFM:C01728', 'RER E');
}
run();
