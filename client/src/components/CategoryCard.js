const CategoryCard = ({name, description}) => {


    return (
        <div id='category-container'>
            <div id='category-name'> 
                <h3>{name}</h3>
            </div>
            <div id='category-descr'>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default CategoryCard