return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "data-behaviors explorer"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["h2", "navigation"],
         ["h3", "menu"],
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"list_simple_data_1"}
         ],
         ["div", {"id":"navOutput", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];