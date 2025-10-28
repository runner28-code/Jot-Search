import PropTypes from 'prop-types';

export default function TabContainer({ tabChoices, activeTab, setActiveTab, isLocked, absolute = true }) {

  const absoluteStyles = absolute ? 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
  return (
    <div className={`${absoluteStyles} w-fit flex gap-s vw-768:gap-xxl-2 justify-around bg-[#e7f0f8] border border-royalBlue border-solid rounded-full py-5 px-8 `}>
      { tabChoices.map(choice => {
        return <TabButton
          key={choice}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLocked={isLocked}
        />
      })}
    </div>
  )
}

TabContainer.propTypes = {
  tabChoices: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
  absolute: PropTypes.bool,
}

function TabButton({ choice, activeTab, setActiveTab, isLocked }) {
  const isActiveTab = choice === activeTab;

  function handleClick(choice) {
    if ( isLocked ) {
      return null;
    }
    setActiveTab(choice);
