import PropTypes from 'prop-types';

export default function TabContainer({ tabChoices, activeTab, setActiveTab, isLocked, absolute = true }) {

  const absoluteStyles = absolute ? 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
  return (
      { tabChoices.map(choice => {
        return <TabButton
          key={choice}
          choice={choice}
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
  }

  const titleCasedTab = choice.charAt(0).toUpperCase() + choice.slice(1);
  let tabStyles = 'px-14 py-3 rounded-full cursor-pointer Mobile-Body-textmobile-text-size-large-2 ';
  tabStyles += conditionalStyles(isActiveTab, isLocked);

  return (
    <button
      key={choice}
      className={tabStyles}
      onClick={() => handleClick(choice)}
    >
      {titleCasedTab === 'Jobs' ? 'Careers' : titleCasedTab}
    </button>
  );
