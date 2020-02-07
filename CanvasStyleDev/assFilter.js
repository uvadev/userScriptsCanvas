function moduleFilter() 
{
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("div.context_module").then(element => 
  {
    if (ENV.current_user_roles.includes('teacher'))
    {
      const bar = document.querySelector(".header-bar");
      bar.innerHTML += `<div><ul id='module_filters' style='list-style-type:none;display:inline;margin-left:0px;'></ul></div>`;
      const item_types = 
      [
        { id: "wiki_page", label: "Pages", icon: "icon-document" },
        { id: "assignment", label: "Assignments", icon: "icon-assignment" },
        { id: "quiz", label: "Quizzes", icon: "icon-quiz" },
        { id: "discussion_topic",label: "Discussion Topics",icon: "icon-discussion"},
        { id: "external_url", label: "Links", icon: "icon-link" },
        { id: "attachment", label: "Files", icon: "icon-paperclip" },
        {id: "context_external_tool",label: "External Tools",icon: "icon-integrations"}
      ];
      item_types.forEach(function(type) 
      {
        let docFrag = document.createDocumentFragment();
        let listItem = document.createElement("li");
        let inputCB = document.createElement("input");
        let labelCB = document.createElement("label");
        docFrag.appendChild(listItem);
        docFrag.appendChild(inputCB);
        docFrag.appendChild(labelCB);
        listItem.setAttribute("style","padding: 0 1em 0 0; display: inline-block;");
        inputCB.setAttribute("type", "checkbox");
        inputCB.setAttribute("id", `${type["id"]}`);
        inputCB.setAttribute("name", `${type["id"]}`);
        inputCB.setAttribute("checked", "");
        inputCB.setAttribute("style", "display: none;");
        labelCB.setAttribute("for", `${type["id"]}`);
        labelCB.innerHTML = `<i id="module_filter_${type["id"]}" class="${type["icon"]}" title="${type["label"]}" style="color: green;"></i>`;
        document.querySelector("ul#module_filters").appendChild(docFrag);
        document.querySelector(`#${type["id"]}`).addEventListener("change",function() 
        {
            if (this.checked) 
            {
              if (document.querySelector(`li.${type["id"]}`) !== null) {
                document.querySelector(`li.${type["id"]}`).style.display = "block";
                document.querySelector(`#module_filter_${type["id"]}`).style.color = "green";
              }
            } else 
            {
              if (document.querySelector(`li.${type["id"]}`) !== null) {
                document.querySelector(`li.${type["id"]}`).style.display = "none";
                document.querySelector(`#module_filter_${type["id"]}`).style.color = "black";
              }
            }
        },false);
      });
    }
  });
}