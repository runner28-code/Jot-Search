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
