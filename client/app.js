fetch("/api/movie")
.then((res) => res.json())
.then((data) => {
    console.log(data);
});