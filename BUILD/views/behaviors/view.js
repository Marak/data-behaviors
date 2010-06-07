return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "behaviors explorer"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["h2", "navigation"],
         ["h3", "menu"],
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"views.behaviors"}
         ],
         ["div", {"id":"behaviors", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];