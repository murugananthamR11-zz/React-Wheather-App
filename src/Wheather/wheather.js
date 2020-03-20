import React, { Component } from 'react';
import './Wheather.css';
import axios from 'axios';
import { Dimmer, Loader, Grid, Form, Modal, Header, Icon, Input, Button } from 'semantic-ui-react';
import Cardcontent from '../Card/Card';
import ModalContent from '../Modal/Modal';

class Wheather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wheatherReport: {},
            searchValue: '',
            wheatherPopShow: false,
            WheatherPopError: false,
            cardsArray: '',
            emptyField: false,
            loading: false,
            addBtnShow: false,
            removeBtnShow: false,
            getCardIndex: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.popupClose = this.popupClose.bind(this);
        this.addCard = this.addCard.bind(this);
        this.openCard = this.openCard.bind(this);
        this.removeCard = this.removeCard.bind(this)
    }

    handleSearch(event) {
        this.setState({ searchValue: event.target.value });
    }

    onSearchHandler = (e) => {
        if(!this.state.searchValue){
            return
        }
        this.setState({
            loading: true
        })
        //console.log(this.state.cardsArray)
        axios.get('https://openweathermap.org/data/2.5/weather?q=' + this.state.searchValue + '&appid=b6907d289e10d714a6e88b30761fae22')
            .then(res => {
                const wheatherReport = res.data;
                this.setState({ wheatherReport });
                //console.log(this.state.wheatherReport);
                this.setState({
                    wheatherPopShow: true,
                    addBtnShow: true,
                    loading: false,
                    searchValue: ''
                })
            },
                (err) => {
                    this.setState({
                        WheatherPopError: true,
                        loading: false,
                        emptyField: false,
                    })
                });
    }

    popupClose() {
        this.setState({
            wheatherPopShow: false,
            addBtnShow: false,
            removeBtnShow: false,
            WheatherPopError: false,
            searchValue: ''
        })
    }
    addCard = () => {
        const newcard = [...this.state.cardsArray];
        newcard.unshift(this.state.wheatherReport)
        this.setState({
            cardsArray: newcard,
            addBtnShow: false,
            wheatherPopShow: false
        });
    }
    openCard(key) {
        //console.log(key);
        this.setState({
            wheatherReport: this.state.cardsArray[key],
            wheatherPopShow: true,
            removeBtnShow: true,
            getCardIndex: key
        })
    }
    removeCard() {
        this.setState({
            cardsArray: this.state.cardsArray.filter((_, i) => i !== this.state.getCardIndex),
            wheatherPopShow: false,
            removeBtnShow: false
        })
    }
    render() {

        return (
            <div className="OpenWheather">
                {/* Headerstart */}
                <Grid padded stackable>
                    <Grid.Column floated='left' verticalAlign='middle' className='logo' width={6}>
                        WHEATHER
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        <Form>
                            <Form.Field>
                                <Input size='large' width='100%' action={{ icon: 'search', color: 'green', onClick: () => this.onSearchHandler() }} placeholder='Search...' value={this.state.searchValue} onChange={this.handleSearch} />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid>

                {/* Header end */}

                {/* content start */}
                {this.state.cardsArray.length === 0 &&
                    <Grid padded className='typeSection'>
                        <Grid.Column className='searchBoxCont'>
                            <h1 className="typeSearch">Type the city name <span><img src="/finger.png" alt='finger' /></span> to search</h1>
                            <p>Wheather is the state of the atmosphere, describing for example the degree to <br />which it is hot or hold, wet or dry, carm or stormy, clear or cloudy</p>
                        </Grid.Column>
                    </Grid>

                }
                {/* content end */}
                {/* <!-- Loader start --> */}
                {this.state.loading === true &&
                    <Dimmer active>
                        <Loader size='medium'>Fetching data</Loader>
                    </Dimmer>
                }
                {/* <!-- Loader end --> */}
                {/* <!-- Error popup start --> */}
                <Modal size= 'small' open={this.state.WheatherPopError === true} >
                    <Header icon='thumbs down' color='red' content='Sorry.....' />
                    <Modal.Content>
                        <p>
                            Couldn't find "<strong>{this.state.searchValue}</strong>". <br /> Please try another keyword</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.popupClose}>
                            <Icon name='checkmark' /> Okay
                        </Button>
                    </Modal.Actions>
                </Modal>
                {/* <!-- Error popup end --> */}

                {/* <!-- Wheather details popup start --> */}
                {this.state.wheatherPopShow === true &&
                    <ModalContent states={this.state} handleAddCard={this.addCard} handleCancelMethod={this.popupClose} handleRemoveCard={this.removeCard}/>
                }
                {/* <!-- Wheather details popup end --> */}

                {/* <!-- wheather details card section start --> */}
                {this.state.cardsArray.length !== 0 &&
                    <Cardcontent cards={this.state.cardsArray}  handleMethod={this.openCard} />
                }
                {/* <!-- wheather details card section end --> */}
            </div>

        )
    }
}

export default Wheather;