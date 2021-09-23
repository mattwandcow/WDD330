const links=[
    {
        label: "Week 01 notes",
        url: "notes/Notes_W01.txt"
    },
    {
        label: "Week 02 notes",
        url: "notes/Notes_W02.txt"
    }
]

links.forEach(element =>{
    li = document.createElement('li');
    a = document.createElement('a')
    a.appendChild(document.createTextNode(element.label));
    a.title=element.label;
    a.href=element.url;
    li.appendChild(a);
    document.getElementsByName('lesson-links')[0].appendChild(li);

});

//read list of links from array
//for each:
//  create li element
//  add an <a> to it
//  add li to ul
