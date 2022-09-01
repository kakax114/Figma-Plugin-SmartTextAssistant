//import react and ui.css
import React from 'react';
import '../styles/ui.css';

const EmptyState = (props) => {
    return (
        <div className="empty-state">
            <h2>No text selected</h2>

            <div>
                <svg width="82" height="75" viewBox="0 0 82 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="39.4866" y1="67.8123" x2="35.4866" y2="72.8123" stroke="#666C72" />
                    <line x1="47.5962" y1="69.5" x2="47.5962" y2="74.5" stroke="#666C72" />
                    <line x1="55.4866" y1="67.1877" x2="59.4866" y2="72.1877" stroke="#666C72" />
                    <rect x="1.59619" y="2" width="61" height="45" rx="4.5" stroke="#666C72" stroke-width="3" />
                    <line x1="3.09619" y1="9" x2="53.0962" y2="9" stroke="#666C72" />
                    <circle cx="46.5962" cy="34" r="21.5" fill="#23242A" stroke="#666C72" stroke-width="2" />
                    <path
                        d="M67.5412 49.0304C65.7314 47.327 62.8835 47.4133 61.1801 49.2231C59.4768 51.0329 59.5631 53.8808 61.3729 55.5842L67.5412 49.0304ZM71.8191 65.4159L75.096 68.5L81.2643 61.9462L77.9874 58.8621L71.8191 65.4159ZM61.3729 55.5842L71.8191 65.4159L77.9874 58.8621L67.5412 49.0304L61.3729 55.5842Z"
                        fill="#666C72"
                    />
                    <path
                        d="M44.8667 38.6893V38.5341C44.8776 37.5213 44.9783 36.7154 45.1689 36.1165C45.3649 35.5175 45.6426 35.0329 46.002 34.6626C46.3614 34.2924 46.7943 33.9548 47.3006 33.6499C47.6274 33.4429 47.9214 33.2115 48.1828 32.9556C48.4441 32.6997 48.651 32.4057 48.8035 32.0735C48.956 31.7414 49.0322 31.3738 49.0322 30.9709C49.0322 30.4863 48.9178 30.067 48.6891 29.7131C48.4604 29.3591 48.1555 29.0869 47.7744 28.8963C47.3987 28.7003 46.9794 28.6023 46.5166 28.6023C46.0973 28.6023 45.6971 28.6894 45.3159 28.8636C44.9348 29.0379 44.6189 29.3101 44.3685 29.6804C44.118 30.0452 43.9737 30.5162 43.9356 31.0934H41.4526C41.4908 30.1133 41.7385 29.2856 42.1959 28.6104C42.6533 27.9298 43.2577 27.4152 44.0091 27.0668C44.766 26.7183 45.6018 26.544 46.5166 26.544C47.5185 26.544 48.3951 26.7319 49.1465 27.1076C49.8979 27.4779 50.4806 27.9979 50.8944 28.6676C51.3137 29.3319 51.5233 30.1078 51.5233 30.9954C51.5233 31.6052 51.428 32.1552 51.2374 32.6452C51.0469 33.1299 50.7746 33.5627 50.4207 33.9439C50.0722 34.325 49.6529 34.6626 49.1629 34.9567C48.7 35.2453 48.3243 35.5447 48.0357 35.8551C47.7526 36.1655 47.5457 36.533 47.415 36.9577C47.2843 37.3825 47.2135 37.9079 47.2026 38.5341V38.6893H44.8667ZM46.1 43.6552C45.6535 43.6552 45.2696 43.4973 44.9484 43.1815C44.6271 42.8602 44.4665 42.4736 44.4665 42.0217C44.4665 41.5752 44.6271 41.194 44.9484 40.8782C45.2696 40.5569 45.6535 40.3963 46.1 40.3963C46.5411 40.3963 46.9222 40.5569 47.2435 40.8782C47.5702 41.194 47.7335 41.5752 47.7335 42.0217C47.7335 42.3211 47.6573 42.5961 47.5048 42.8466C47.3578 43.0916 47.1618 43.2876 46.9168 43.4347C46.6717 43.5817 46.3995 43.6552 46.1 43.6552Z"
                        fill="#C4C3C5"
                    />
                </svg>
            </div>

            <p className="label">Select any layer with texts you want to change in the page and refresh </p>

            <div className="button" onClick={props.onClick}>
                Refresh
            </div>
        </div>
    );
};

export default EmptyState;