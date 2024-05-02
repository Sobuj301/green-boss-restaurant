import useMenu from "../../Hooks/useMenu";
import Cover from "../../Shared/Cover/Cover";
import coverImg from "../../assets/shop/banner2.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TabItem from "./TabItem";
import { useState } from "react";
import { useParams } from 'react-router-dom';
const Order = () => {
    const {category} = useParams()

    const categories = ['salad','pizza','soup','dessert','drinks']
    const initialIndex = categories.indexOf(category)
    const [tabIndex,setTabIndex] = useState(initialIndex)
    console.log(tabIndex)
    const [menu] = useMenu()
    const drinks = menu.filter(item => item.category === "drinks")
    const desserts = menu.filter(item => item.category === "dessert")
    const pizzas = menu.filter(item => item.category === "pizza")
    const soups = menu.filter(item => item.category === "soup")
    const salads = menu.filter(item => item.category === "salad")
  
    return (
        <div>
            <Cover img={coverImg} title="Our Shop"></Cover>

            <div className="max-w-5xl mx-auto">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salads</Tab>
                        <Tab>Pizzas</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>

                    </TabList>
                    <TabPanel>
                        <TabItem items={salads} title="salad"></TabItem>
                    </TabPanel>
                    <TabPanel>
                        <TabItem items={pizzas} title="pizza"></TabItem>
                    </TabPanel>
                    <TabPanel>
                        <TabItem items={soups} title="soup"></TabItem>
                    </TabPanel>
                    <TabPanel>
                        <TabItem items={desserts} title="dessert"></TabItem>
                    </TabPanel>
                    <TabPanel>
                        <TabItem items={drinks} title="drinks"></TabItem>
                    </TabPanel>


                </Tabs>
            </div>
        </div>
    );
};

export default Order;