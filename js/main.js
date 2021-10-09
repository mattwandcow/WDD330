const links=[
    {
        label: "Week 01 notes",
        url: "notes/Notes_W01.txt"
    },
    {
        label: "Week 02 notes",
        url: "notes/Notes_W02.txt"
    }
    ,
    {
        label: "Week 03 notes",
        url: "notes/Notes_W03.txt"
    }
    ,
    {
        label: "Week 03 Json notes",
        url: "notes/JSON_Notes.txt"
    }
    ,
    {
        label: "Week 03 Events notes",
        url: "notes/JS_events.txt"
    }
    ,
    {
        label: "Week 03 DOM notes",
        url: "notes/DOM.txt"
    }
    ,
    {
        label: "Week 03 date notes",
        url: "notes/date_notes.txt"
    }
    ,
    {
        label: "Week 03 math notes",
        url: "notes/Math_notes.txt"
    }
    ,
    {
        label: "Week 04 notes",
        url: "notes/Notes_W04.txt"
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
