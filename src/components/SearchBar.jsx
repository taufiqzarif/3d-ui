import { AutoComplete, Input } from "antd";
import "antd/dist/antd.css";
import React from "react";

const renderTitle = (title) => (
    <span>
        {title}
        <a
            style={{
                float: "right",
            }}
            href=" https://www.curtin.edu.my/"
            target="_blank"
            rel="noopener noreferrer"
        >
            more
        </a>
    </span>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {title}
        </div>
    ),
});

const options = [
    {
        label: renderTitle('Buildings'),
    options: [renderItem('SK3'), renderItem('Cafe Kenyalang')],
    },
];

const SBar = () => (
    <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{
            width: 400,
            paddingRight: 45,
            paddingBottom:5,
            marginRight:500,
        }}
        options={options}
    >
        <Input.Search size="large" placeholder="Search..."/>
    </AutoComplete>
);

export default SBar;
