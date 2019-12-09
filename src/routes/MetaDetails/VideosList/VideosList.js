const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const SeasonsBar = require('./SeasonsBar');
const Video = require('./Video');
const useSelectableSeasons = require('./useSelectableSeasons');
const styles = require('./styles');

const VideosList = ({ className, metaResource }) => {
    const videos = React.useMemo(() => {
        return metaResource && metaResource.content.type === 'Ready' ?
            metaResource.content.content.videos
            :
            [];
    }, [metaResource]);
    const [seasons, selectedSeason, videosForSeason, selectSeason] = useSelectableSeasons(videos);
    const seasonOnSelect = React.useCallback((event) => {
        selectSeason(event.value);
    }, []);
    return (
        <div className={classnames(className, styles['videos-list-container'])}>
            {
                !metaResource || metaResource.content.type === 'Loading' ?
                    <React.Fragment>
                        <SeasonsBar.Placeholder className={styles['seasons-bar']} />
                        <div className={styles['videos-scroll-container']}>
                            <Video.Placeholder className={styles['video']} />
                            <Video.Placeholder className={styles['video']} />
                            <Video.Placeholder className={styles['video']} />
                            <Video.Placeholder className={styles['video']} />
                            <Video.Placeholder className={styles['video']} />
                        </div>
                    </React.Fragment>
                    :
                    metaResource.content.type === 'Err' || videosForSeason.length === 0 ?
                        <div className={styles['message-label']}>
                            No videos found for this meta
                        </div>
                        :
                        <React.Fragment>
                            {
                                seasons.length > 1 ?
                                    <SeasonsBar
                                        className={styles['seasons-bar']}
                                        season={selectedSeason}
                                        seasons={seasons}
                                        onSelect={seasonOnSelect}
                                    />
                                    :
                                    null
                            }
                            <div className={styles['videos-scroll-container']}>
                                {videosForSeason.map((video, index) => (
                                    <Video
                                        {...video}
                                        key={index}
                                        className={styles['video']}
                                    />
                                ))}
                            </div>
                        </React.Fragment>
            }
        </div>
    );
};

VideosList.propTypes = {
    className: PropTypes.string,
    metaResource: PropTypes.object
};

module.exports = VideosList;
