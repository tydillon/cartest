const fetch = require("isomorphic-fetch")

const source = "https://docs.google.com/spreadsheets/d/193Hou07FkHfuSH9IccJxFxPHvxJdQwwb33kaxianMd4/gviz/tq?tqx=out:json&tq&gid=0"
fetch(source)
    .then(response => response.text())
    .then(data => data.substring(47).slice(0, -2))
    .then(data => {
        const parsedData = JSON.parse(data)
        const table = parsedData.table
        const rows = table.rows
        rows.shift()
        return rows.map(row => {
            const c = row.c
            const rows = c.map(newRow => {
                if (newRow !== null) {
                    return newRow.v
                }
            })
            const title = rows[0]
            const image = rows[1]
            const description = rows[2]
            const url = rows[3]
            const youtube = rows[4]
            const article = rows[5]
            const workingLink = rows[6]
            return {title, image, description, url, youtube, article, workingLink}
        })
    })
    .then(formattedData => console.log(formattedData))
//   .then( data =>  {
//       console.log('data', data)
//       // data.feed.entry is the array that stores our projects
//       // the projects are stored as objects
//       let projects = data.feed.entry.map( project => {
//         // console.log('project', project.gsx$title.$t)
//         return {
//           title: project.gsx$title.$t,
//           image: project.gsx$image.$t,
//           description: project.gsx$description.$t,
//           url: project.gsx$url.$t
//         }
//       })
//       app(projects)
//   }) // this provides us access to the parse data
//   .catch( err => console.log('err', err))