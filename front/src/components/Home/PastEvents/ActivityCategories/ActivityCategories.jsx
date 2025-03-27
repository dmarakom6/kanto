/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import "../PastEvents.css"
import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

import Categories from "../../../../../data/categories.json"

import CategoryImg from "../../../../../data/categoryImage.json"

export default function ActivityCategories() {

  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {

    fetch('https://fly.storage.tigris.dev/kanto-calendar/public/front/data/calendar.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('calendarData', JSON.stringify(data));
        setCalendarData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }, []);

  let categories = new Set();
  Object.values(calendarData).forEach(event => {
    if (event.category) {
      categories.add(event.category);
    }
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const currentCategory = Array.from(categories)[selectedTab];

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
          style={{ background: `url(${CategoryImg[currentCategory] || "/kanto/assets/cat/history_dummy_img.jpg"})` }}
        >
          <div className="tabpanel--category-img--header">{currentCategory || "Επιλέξτε μια Κατηγορία"}</div>
        </div>
        <p className="tabpanel--p">
          {
            Categories[currentCategory]
          }
        </p>
        <p className="tabpanel--p">
          {currentCategory ? (
            <>
              Δείτε τις προηγούμενες δραστηριότητές μας σχετικά με <b>{currentCategory}</b>:
            </>
          ) : (
            "Πατήστε πάνω σε μια κατηγορία στα αριστερά για να δείτε το περιεχόμενό της."
          )}
        </p>

        {/* Render events for the selected category */}
        <div id="linklist" className="tabpanel--link-list">
          {Object.values(calendarData).reverse().filter(event => event.url || (!event.url && !event.recurring)).map((event) => {
            if (event.category === Array.from(categories)[selectedTab]) {
              const parsedUrl = event.url ? event.url.replace(/<\/?a[^>]*>/g, "") : "";
              return (
                <ul key={event.title}>
                  <span className="tabpanel--link-list-date">{event.date}</span> {event.title}{" "}
                  <a href={parsedUrl} style={{ display: parsedUrl === "" ? "none" : "inline" }}>Υλικό</a>
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
    height: 7rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 2fr)); /* Adjust column size for smaller screens */
    position: sticky;
    top: 10%;
    z-index: 9999;
  }
  `
);

