/* eslint-disable no-unused-vars */
import "../PastEvents.css"
import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';


export default function ActivityCategories() {
  return (
    <Tabs defaultValue={0} orientation={window.innerWidth > 800 ? "vertical" : "horizontal"}>
      <TabsList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
        <Tab>Four</Tab>
      </TabsList>
      <TabPanel className="tabpanel" value={0}>
        <img className="tabpanel--img" src="https://media.istockphoto.com/id/1371940128/photo/multiracial-friends-taking-big-group-selfie-shot-smiling-at-camera-laughing-young-people.jpg?s=612x612&w=0&k=20&c=FPs-C92zbN6RkHnPG4Fl9zyP2-HZWGy9Prdt46Yn-IY=" alt="Boilerplate" />
        <p className="tabpanel--p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nesciunt, iusto consequuntur ipsam eaque aliquid temporibus accusantium odit placeat ea voluptatem error beatae maxime velit tempore, exercitationem officiis iste aliquam!</p>
        <div className="tabpanel--link-list">
          <ul><span className="tabpanel--link-list-date">23/9/2024</span> Δραστηριότητα 1 - Παρακολούθηση της Παράστασης Ζ<a href="https://www.youtube.com">Youtube</a></ul>
          <ul><span className="tabpanel--link-list-date">26/7/2024</span> Δραστηριότητα 2 - Επίσκεψη στο μουσείο Χ <a href="https://www.youtube.com">Vimeo</a></ul>
          <ul><span className="tabpanel--link-list-date">29/6/2024</span> Δραστηριότητα 3 - Δωρεά στον μη-κερδοσκοπικό οργανισμό Υ<a href="https://www.youtube.com">PDF</a></ul>
        </div>
      </TabPanel>


      <TabPanel value={1}>Second page</TabPanel>
      <TabPanel value={2}>Third page</TabPanel>
    </Tabs>
  );
}

const main = "rgba(133, 58, 58, 1)"

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
  min-width: 80px;
  background-color: ${main};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  position: sticky;
  top: 10%;
  z-index: 9999;
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
  }
  `
);
