import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/bus", async (req, res) => {
    try {
        const r = await fetch("https://h34.hanoverdisplays.com/beziers/gtfsrt/api-1.0/gtfs-rt/vehicle-positions.json");
        const buffer = await r.arrayBuffer();

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", "application/octet-stream");

        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur proxy");
    }
});

app.listen(3000, () => console.log("Proxy opérationnel sur port 3000"));
async function chargerLignes() {
    try {
        const res = await fetch("lignes_beziers.geojson");
        const data = await res.json();

        L.geoJSON(data, {
            style: {
                color: "#0074D9",
                weight: 4,
                opacity: 0.8
            }
        }).addTo(map);

        console.log("Lignes chargées !");
    } catch (err) {
        console.error("Erreur chargement lignes :", err);
    }
}

chargerLignes();
