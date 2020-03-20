import React from 'react';
import { Modal, Image, Table, Header, Grid, Icon, Button } from 'semantic-ui-react';

function ModalContent(props) {

    let states = props.states;

    return (
        <Modal open={states.wheatherPopShow === true} >
            <Header textAlign='center' content={`Wheather in ${states.wheatherReport.name}, ${states.wheatherReport.sys.country}`} />
            <Modal.Content>
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column textAlign="center" verticalAlign="middle" width={6}>
                            <div> <Image src={`https://openweathermap.org/img/wn/${states.wheatherReport.weather[0].icon}@2x.png`} size='tiny' verticalAlign='middle' /> <span>{states.wheatherReport.main.temp} &#176;C</span>
                            </div>
                            <div className="cityStorm">{states.wheatherReport.weather[0].main}</div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Table color='green'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='hand point right' color='green' />
                                                Wind
                                            </Table.Cell>
                                        <Table.Cell>{states.wheatherReport.wind.speed} m/s, {states.wheatherReport.wind.deg}&#176;C</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >
                                            <Icon name='hand point right' color='green' />
                                                 Humidity
                                            </Table.Cell>
                                        <Table.Cell>{states.wheatherReport.main.humidity}% </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >
                                            <Icon name='hand point right' color='green' />
                                             Pressure
                                            </Table.Cell>
                                        <Table.Cell>{states.wheatherReport.main.pressure} hpa </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >
                                            <Icon name='hand point right' color='green' />
                                            Sunrise
                                            </Table.Cell>
                                        <Table.Cell>
                                            {new Intl.DateTimeFormat('en-GB', {
                                                hour: 'numeric', minute: 'numeric',hour12: true
                                            }).format(new Date(states.wheatherReport.sys.sunrise * 1000))}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >
                                            <Icon name='hand point right' color='green' />
                                            Sunset
                                            </Table.Cell>
                                        <Table.Cell>
                                            {new Intl.DateTimeFormat('en-GB', {
                                                hour: 'numeric', minute: 'numeric',hour12: true
                                            }).format(new Date(states.wheatherReport.sys.sunset * 1000))}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Modal.Content>
            <Modal.Actions className="centerdActionbtn ">
                {states.addBtnShow === true &&
                    <Button color='green' onClick={() => props.handleAddCard()}><Icon name='plus' /> Add</Button>
                }
                {states.removeBtnShow === true &&
                    <Button color="red" onClick={() => props.handleRemoveCard()}>Remove</Button>
                }
                <Button onClick={() => props.handleCancelMethod()}>Cancel</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalContent;