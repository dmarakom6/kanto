/* eslint-disable no-unused-vars */
import { useState } from "react";
import "../PastEvents.css"
import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

import Calendar from '../../../../../data/calendar';

let categories = new Set();
Object.values(Calendar).forEach(event => {
  if (event.category) {
    categories.add(event.category);
  }
});

export default function ActivityCategories() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      orientation={window.innerWidth > 800 ? "vertical" : "horizontal"}
    >
      <TabsList>
        {Array.from(categories).map((c, index) => (
          <Tab key={c} value={index}>
            {c}
          </Tab>
        ))}
      </TabsList>

      <TabPanel className="tabpanel" value={selectedTab}>
        <div
          className="tabpanel--category-img"
          style={{ background: "url('/cat/history_dummy_img.jpg')" }}
        >
          <div className="tabpanel--category-img--header">{Array.from(categories)[selectedTab]}</div>
        </div>
        <p className="tabpanel--p">
          Δείτε τις προηγούμενες δραστηριότητές μας σχετικά με <b>{Array.from(categories)[selectedTab]}</b>:
        </p>

        {/* Render events for the selected category */}
        <div className="tabpanel--link-list">
          {Object.values(Calendar).map((event) => {
            if (event.category === Array.from(categories)[selectedTab]) {
              return (
                <ul key={event.title}>
                  <span className="tabpanel--link-list-date">{event.date}</span> {event.title}{" "}
                  <a href={event.url}>Υλικό</a>
                </ul>
              );
            }
            return null;
          })}
        </div>
      </TabPanel>
    </Tabs>
  );
}

const main = "rgba(133, 58, 58, 1)";

const Tab = styled(BaseTab)`
  font-family: 'Comfortaa', IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:focus {
    color: #fff;
    outline: 1px solid #fff;
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${main};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${main};
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
  flex-direction: row; /* Default for wider screens */
  gap: 16px;
  @media (max-width: 1145px) {
    flex-direction: column; /* Stack the tabs and panels vertically for smaller screens */
  }
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 6rem;
  max-height: 30rem;
  overflow-y: scroll;
  background-color: ${main};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${main};
  
  @media (max-width: 1145px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 2fr)); /* Adjust column size for smaller screens */
    position: sticky;
    top: 10%;
    z-index: 9999;
  }
  `
);

