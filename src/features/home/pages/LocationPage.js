import React from 'react';

const LocationPage = ({ saving }) => {
  return (
    <div className="location-page">
      <div className="two-column-row">
        <div>
          Use Latitude / Longitude
        </div>
        <div>
          {saving && 'Saving...'}
        </div>
      </div>

      <div className="two-column-row">
        
      </div>
    </div>
  )
}