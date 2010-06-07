return ["div",
       {"class": "container" },
        ["div", 
         {"class":"header span-24"},
         
         ["h1", "data-behaviors"]
       ],
       
       ["div", 
         {"class":"body span-24"},
         ["div", 
           {"data-behaviors":"nav-menu machine", "data-resource":"views", "class":"nav"}
         ],
         ["div", {"id":"navOutput", "data-behaviors":"machine"}, "this is the area to load stuff"]
       ]
   ];