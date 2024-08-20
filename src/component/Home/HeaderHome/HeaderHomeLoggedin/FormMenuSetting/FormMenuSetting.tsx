import "./FormMenuSetting.css"
export function FormMenuSetting() {
   
  const listItemMenuSetting = [
    {name: "Personal page",
      link: "/personal-page"
    },
    {name: "Setting",
      link: "/setting"
    },
    {name: "Log out",
      link: "/"
    }
  ];


  return (
    <div className="menu_layout_setting">
      <ul className="menu_content">
       
        {
          
          listItemMenuSetting.map((item, index) => (
            <li key={index}>
                {item.name}
            </li>
          ))

        }



      </ul>
  </div>
  );
}
