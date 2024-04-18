const CategoryCard = ({name, description, icon}) => {
    console.log(icon)
    return (
        
        <div id='category-container'>
            <div id='category-icon'> 
                <img src={icon} alt={name}/>
            </div>
            <div class="text-content"> 
                <h3 id='category-name'>{name}</h3>
                <p id='category-descr'>{description}</p>
            </div>
        </div>


        // <div id='category-container'>
        //     <div id='category-icon'> 
        //         <img src={icon} alt={name}/>
        //     </div>
        //     <div id='category-name'> 
        //         <h3>{name}</h3>
        //     </div>
        //     <div id='category-descr'>
        //         <p>{description}</p>
        //     </div>
        // </div>
)}

export default CategoryCard