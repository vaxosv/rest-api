const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());

let courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get("/", (req, res) => {
    res.send("hellow world")
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course not found")
        return;
    };
    res.send(course)
    
    // res.send(req.query);
});

app.post('/courses', (req, res)=>{
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }

    courses.push(course)
    res.send(course)
})

app.put('/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course not found")
        return;
    };

    course.name  = req.body.name;
    res.send(course)

    console.log(courses);
    
})

app.delete("/couses/:id", (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course not found")
        return;
    };

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses)
})

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${port}!`)
);
