import React from 'react';
import { Link } from 'react-router-dom';

    const getTabGroup = ( category ) => {
    if (category === 'React') {
        return [
            {
                tabKey: 1,
                categoryKey: 1,
                tabName: "My Favorite React Tutorial",
                tabURL: "https://www.somedomain.com"
            },
            {
                tabKey: 2,
                categoryKey: 1,
                tabName: "My Second Favorite React Tutorial",
                tabURL: "https://www.somedomain2.com"
            }
        ];
    }
    else if(category === 'JavaScript') {
        return [
            {
                tabKey: 3,
                categoryKey: 2,
                tabName: "My Favorite JavaScript Tutorial",
                tabURL: "https://www.somedomain3.com"
            },
            {
                tabKey: 4,
                categoryKey: 2,
                tabName: "My Second Favorite JavaScript Tutorial",
                tabURL: "https://www.somedomain4.com"
            }
        ];
    }
    else {
        return [];
    }
}

const TabGroup = ( { match } ) => {
    let category = match.params.categoryName; 
    let tabs = getTabGroup(category);
    return(
        <div id="tab-group" className="main">
            {
                tabs.length === 0 ? (
                    <p>You haven't added any pages to {category} yet.</p>
                ) : (
                    <ul>
                    {
                        tabs.map((group) =>
                        <li key={group.tabKey}>
                            <Link to={`${group.tabURL}`}>{group.tabName}</Link>
                        </li>)            
                    }
                    </ul>                    
                )
            }
        </div>
    );
}

export default TabGroup;