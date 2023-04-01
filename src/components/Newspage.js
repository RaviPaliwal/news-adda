import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const hash = require('md5');
var i=1;

export class Newspage extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [{
                "source": {
                  "id": null,
                  "name": "India.com"
                },
                "author": "https://www.india.com/author/sportsdesk/",
                "title": "LIVE BUZZ | IPL 2023: Arijit Singh's Opening Ceremony Act LEAKED - India.com",
                "description": "IPL 2023 BUZZ: We are hours away from the T20 league 2023 opener on March 31, here's all the news, buzz and rumours around the T20 League. Check LIVE streaming details.",
                "url": "https://www.india.com/sports/ipl-2023-gt-vs-csk-live-updates-ahmedabad-today-match-1-rain-gujarat-titans-v-chennai-super-kings-toss-730-time-playing-xi-live-streaming-jio-cinemas-dhoni-hardik-pandya-indian-t20-league-cricketnews-5970771/",
                "urlToImage": "https://static.india.com/wp-content/uploads/2023/03/IPL-2023-LIVE-BUZZ.jpg",
                "publishedAt": "2023-03-31T10:32:48Z",
                "content": "IPL 2023 BUZZ: We are hours away from the T20 league 2023 opener on March 31, here's all the news, buzz and rumours around the T20 League. Check LIVE streaming details.\r\nIPL 2023 LIVE Updates | IPL B… [+985 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "NDTV News"
                },
                "author": null,
                "title": "Details Of PM Degree Not Needed, Says Court, Fines Arvind Kejriwal: Report - NDTV",
                "description": "An order directing the Gujarat University to reveal details of Prime Minister Narendra Modi's degree was set aside today by the state High Court, which said the information is not needed.",
                "url": "https://www.ndtv.com/india-news/details-of-pm-modis-college-degree-not-needed-says-gujarat-court-fines-arvind-kejriwal-rs-25-000-news-agency-ani-3908894",
                "urlToImage": "https://c.ndtvimg.com/2023-03/np8efg2_pm-modi_625x300_28_March_23.jpg",
                "publishedAt": "2023-03-31T10:20:00Z",
                "content": "The Gujarat University was asked to furnish information on PM Modi's Master's degree in 2016.\r\nNew Delhi: An order directing the Gujarat University to reveal details of Prime Minister Narendra Modi's… [+2315 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "NDTV News"
                },
                "author": "NDTV Sports Desk",
                "title": "Pakistan Board Fumes Over Najam Sethi's \"Misquoted\" ODI World Cup Comments - NDTV Sports",
                "description": "The PCB and BCCI have been in discussions with the Asian Cricket Council (ACC) over an appropriate model for the Asia Cup.",
                "url": "https://sports.ndtv.com/cricket/factually-incorrect-pakistan-board-issues-statement-clarifying-position-on-asia-cup-world-cup-3908824",
                "urlToImage": "https://i.ndtvimg.com/i/2017-10/najam-sethi-afp_806x605_61508340964.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675",
                "publishedAt": "2023-03-31T10:12:00Z",
                "content": "The Pakistan Cricket Board (PCB) and the Board of Control for Cricket in India (BCCI) have been in discussions with the Asian Cricket Council (ACC) over an appropriate model for the Asia Cup which is… [+1847 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "The Indian Express"
                },
                "author": "The Indian Express",
                "title": "Astronomers may have finally discovered source of mysterious fast radio bursts: Reports - The Indian Express",
                "description": null,
                "url": "https://indianexpress.com/article/technology/science/fast-radio-bursts-neutron-stars-8530356/",
                "urlToImage": null,
                "publishedAt": "2023-03-31T09:29:17Z",
                "content": null
              },
              {
                "source": {
                  "id": null,
                  "name": "Bqprime.com"
                },
                "author": "Sajeet Manghat",
                "title": "Why Reliance Industries Opted For 1:1 Share-Swap For Jio Financial Services - BQ Prime",
                "description": "The move is driven by a unique shareholder base of Reliance Industries.",
                "url": "https://www.bqprime.com/markets/why-reliance-industries-opted-for-11-share-swap-for-jio-financial-services",
                "urlToImage": "https://gumlet.assettype.com/bloombergquint%2F2022-05%2Ffe732372-50d3-4fbf-a6b4-eaa9079bfda0%2FFile_photo_of_Reliance_Industries_Ltd__s_banner_during_an_AGM_in_Mumbai___Source_BQ_Prime_.png?rect=0%2C50%2C432%2C227&w=1200&auto=format%2Ccompress&ogImage=true",
                "publishedAt": "2023-03-31T09:22:57Z",
                "content": "Shareholder Base\r\nReliance is known to reward shareholders via bonus shares, at times announcing the decision during its annual general meetings.\r\nIn its justification to the stock exchanges on the s… [+1511 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "Hindustan Times"
                },
                "author": "HT Education Desk",
                "title": "Bihar Board 10th Result 2023 Live: BSEB Matric results on HT portal, direct link - Hindustan Times",
                "description": "BSEB Bihar board 10th Resut 2023 Live Updates: BSEB has announced Matric exam results. Students can check it on HT portal.",
                "url": "https://www.hindustantimes.com/education/board-exams/bihar-board-10th-result-2023-bseb-matric-result-live-updates-results-biharboardonline-com-ht-portal-sarkari-result-link-toppers-101680229524985.html",
                "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/03/31/1600x900/bihar-board-10th-result-2023-hindustan-times_1680254250266_1680254262776_1680254262776.jpeg",
                "publishedAt": "2023-03-31T09:21:39Z",
                "content": "BSEB Bihar Board 10th Result 2023 Live Updates: Bihar School Examination Board (BSEB) has announced Bihar board Matric Result 2023. Bihar Education Minister Prof Chandra Shekhar announced these resul… [+15103 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "NDTV News"
                },
                "author": null,
                "title": "Malti Marie, Welcome To India. Priyanka Chopra And Nick Jonas Land In Mumbai With Daughter - NDTV Movies",
                "description": "Priyanka Chopra and Nick Jonas were clicked at the Mumbai airport with their daughter",
                "url": "https://www.ndtv.com/entertainment/malti-marie-welcome-to-india-priyanka-chopra-and-nick-jonas-land-in-mumbai-with-daughter-3908816",
                "urlToImage": "https://c.ndtvimg.com/2023-03/bb76k49_priyanka-chopra_625x300_31_March_23.jpg",
                "publishedAt": "2023-03-31T09:12:13Z",
                "content": "Priyanka Chopra, Nick Jonas with daughter Malti at the airport.\r\nNew Delhi: Attention folks, look who just checked into Mumbai on Friday afternoon. Priyanka Chopra along with her husband Nick Jonas a… [+1657 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "NDTV News"
                },
                "author": null,
                "title": "Fresh Clashes In Bengal's Howrah Day After Violence During Ram Navami - NDTV",
                "description": "Fresh violence has been reported in West Bengal's Howrah which saw communal clashes during a Ram Navami procession on Thursday. The incident was reported despite heavy police deployment - including riot control force - in the area.",
                "url": "https://www.ndtv.com/india-news/stone-pelting-arson-in-bengals-howrah-a-day-after-violence-during-ram-navami-3908669",
                "urlToImage": "https://c.ndtvimg.com/2023-03/jkmcqo1_howrah-protest_625x300_31_March_23.jpg",
                "publishedAt": "2023-03-31T09:09:00Z",
                "content": "New Delhi: Fresh violence has been reported in West Bengal's Howrah which saw communal clashes during a Ram Navami procession on Thursday. The incident was reported despite heavy police deployment - … [+1351 chars]"
              },
              {
                "source": {
                  "id": "the-times-of-india",
                  "name": "The Times of India"
                },
                "author": "Steffy Thevar",
                "title": "Over 45 per cent people tested in Pune have elevated levels of homocysteine in blood: Study - Times of India",
                "description": "India accounts for about 60% of the global heart disease cases despite having less than 20% of the global population, according to public health estim",
                "url": "https://timesofindia.indiatimes.com/city/pune/over-45-per-cent-people-tested-in-pune-have-elevated-levels-of-homocysteine-in-blood-study/articleshow/99140416.cms",
                "urlToImage": "https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                "publishedAt": "2023-03-31T09:01:00Z",
                "content": "<ul><li>News</li>\r\n<li>City News</li>\r\n<li>pune News</li>\r\n<li>Over 45 per cent people tested in Pune have elevated levels of homocysteine in blood: Study</li></ul>\r\nFOLLOW US ON SOCIAL MEDIAFacebook… [+29 chars]"
              },
              {
                "source": {
                  "id": "the-times-of-india",
                  "name": "The Times of India"
                },
                "author": "TIMESOFINDIA.COM",
                "title": "OnePlus Nord CE 3 Lite key specifications confirmed: Here’s what the smartphone will offer - Times of India",
                "description": "OnePlus will launch its new Nord series smartphone in India next week. OnePlus has scheduled a launch event for April 4, where the company will launch",
                "url": "https://timesofindia.indiatimes.com/gadgets-news/oneplus-nord-ce-3-lite-key-specifications-confirmed-heres-what-the-smartphone-will-offer/articleshow/99139951.cms",
                "urlToImage": "https://static.toiimg.com/thumb/msid-99139949,width-1070,height-580,imgsize-284223,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
                "publishedAt": "2023-03-31T08:44:00Z",
                "content": "<ul><li>News</li>\r\n<li>Gadgets News News</li>\r\n<li>OnePlus Nord CE 3 Lite key specifications confirmed: Heres what the smartphone will offer</li></ul>\r\nFOLLOW US ON SOCIAL MEDIAFacebookTwitterInstagr… [+15 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "The Indian Express"
                },
                "author": "The Indian Express",
                "title": "The story of porn star Stormy Daniels and her alleged tryst with Donald Trump - The Indian Express",
                "description": null,
                "url": "https://indianexpress.com/article/explained/explained-global/who-is-stormy-daniels-porn-star-donald-trump-8530213/",
                "urlToImage": null,
                "publishedAt": "2023-03-31T08:43:41Z",
                "content": null
              },
              {
                "source": {
                  "id": null,
                  "name": "NDTV News"
                },
                "author": null,
                "title": "India Turns Optimistic On Forging G-20 Consensus On Russia's War - NDTV",
                "description": "India is turning more optimistic about achieving a consensus from Group of 20 nations on the language used to describe Russia's war in Ukraine, according to a person familiar with the matter.",
                "url": "https://www.ndtv.com/india-news/india-turns-optimistic-on-forging-g-20-consensus-on-russias-war-3908651",
                "urlToImage": "https://c.ndtvimg.com/2023-03/3ac11um8_g20-indiabloomberg-_625x300_31_March_23.jpg",
                "publishedAt": "2023-03-31T08:11:22Z",
                "content": "India is set to host the annual G-20 summit in September.\r\nIndia is turning more optimistic about achieving a consensus from Group of 20 nations on the language used to describe Russia's war in Ukrai… [+2847 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "Koimoi"
                },
                "author": "Shalmesh More",
                "title": "Dasara Box Office Day 1: Off To A Superb Start, Nani All Set To Enter The Category Of So-Called 'Tier 1' Actors? - Koimoi",
                "description": "Nani's pan-India debut, Dasara has opened strongly on its day 1 at the Indian box office. Here's how much collection it has made!",
                "url": "https://www.koimoi.com/box-office/dasara-box-office-day-1-off-to-a-superb-start-nani-all-set-to-enter-the-category-of-so-called-tier-1-actors/",
                "urlToImage": "https://static-koimoi.akamaized.net/wp-content/new-galleries/2023/03/dasara-box-office-day-1-01.jpg",
                "publishedAt": "2023-03-31T07:34:51Z",
                "content": "Dasara Box Office Day 1 ( Photo Credit Movie Still )\r\nNani’s Dasara has opened to a terrific response at the Indian box office. Amid a good buzz, the film was released yesterday and has been receivin… [+1855 chars]"
              },
              {
                "source": {
                  "id": null,
                  "name": "The Indian Express"
                },
                "author": "The Indian Express",
                "title": "Another ‘Rahul Gandhi’ who contested from Wayanad was disqualified - The Indian Express",
                "description": null,
                "url": "https://indianexpress.com/article/india/another-rahul-gandhi-who-contested-from-wayanad-was-disqualified-8530008/",
                "urlToImage": null,
                "publishedAt": "2023-03-31T07:32:30Z",
                "content": null
              },
              {
                "source": {
                  "id": null,
                  "name": "The Indian Express"
                },
                "author": "The Indian Express",
                "title": "Can gene testing tell us who is predisposed to premature heart attacks? What does the AHA guideline mean for India? - The Indian Express",
                "description": null,
                "url": "https://indianexpress.com/article/health-wellness/can-gene-testing-tell-us-who-is-predisposed-to-premature-heart-attacks-what-does-the-aha-guideline-mean-for-india-8529909/",
                "urlToImage": null,
                "publishedAt": "2023-03-31T07:09:20Z",
                "content": null
              }],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsAdda`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }
    
    getkey=(title)=>{
        i=i+1;
        // console.log(title+hash(title)+i)
        return title+hash(title)+i

    }

    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsAdda - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={this.getkey(element.title)}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    }
}

export default Newspage