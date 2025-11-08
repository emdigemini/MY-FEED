import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/800.css"

export function LoadingScreen(){
  return (
    <div className="loading-screen">
      <div className="loading-name">
        <div className="app-icon">
          <img src="../../public/icons/my-feed.png" />
        </div>
        <div className="app-name">MY FEED</div>
      </div>
      <p className="loading-paragraph">
        Make a post here about your rants, random thoughts, or just whatever's on your mind. <br /> No rules, no pressure, just you and your words.
      </p>
      <p>
        This is offline mode and your thoughts are safe here.
      </p>
    </div>    
  )
}