import express from "express";
import postgres from "postgres";
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("./client"));


const sql = postgres({database: "bestMovies"});

const port = 3000;

app.get("/movie", (req, res, next) => {
    sql`SELECT * FROM movie`.then((result) =>{
        res.json(result);
    }).catch(next);
})

app.get("/movie/:id", (req, res, next) =>{
    const id = req.params.id;
    sql`SELECT * FROM movie WHERE id = ${id}`.then((result) =>{
        if(result.length === 0){
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.end("Not Found");
        }else{
            res.json(result[0]);
            console.log(result[0]);
        }
    }).catch(next);
})

app.post("/movie", (req, res, next) =>{
    const entry = req.body;
    const requiredFields = ["title", "year", "genre", "star"];
    const errors = [];

    for(let field of requiredFields){
        if(entry[field] === undefined){
            errors.push(`Missing movie '${field}'.`);
        }
        if(entry.age && typeof entry.age !== "number"){
            errors.push("Year must be a number.");
        }
        const { title, year, genre, star } = entry;
        if(errors.length > 0){
            res.status(422);
            res.send(errors.join(" "));
        }else{
            sql`INSERT INTO movie (title, year, genre, star) VALUES (${title}, ${year}, ${genre}, ${star}) RETURNING *`.then(result => {
                res.status(201);
                res.json(result[0]);
            }).catch(next);
        }
    }
});

app.patch("/movie/:id", (req, res, next) => {
    const  id  = req.params.id;
    const { title, year, genre, star } = req.body;
    sql`
    UPDATE movie
    SET ${sql(req.body)}
    WHERE id = ${id} RETURNING *`
    .then(result => {
        console.log(result.statement.string);
        res.send(result[0])
    }).catch(next);
})

app.delete("/movie/:id", (req, res, next) => {
    const id = req.params.id;
    sql`DELETE FROM movie WHERE id = ${id}`.then(result => {
        res.send(`DELETED id: ${id}`);
    }).catch(next);
})


app.use((err, req, res, next) =>{
    console.error(err);
    res.status(500).send("Internal Server Error");
})



app.listen(port, () =>{
    console.log(`Server Running On Port: ${port}`);
});





