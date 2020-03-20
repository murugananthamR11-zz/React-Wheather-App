import React from 'react';
import { Grid, Image, Card, Button } from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

function Cardcontent(props) {

    let cards = props.cards;

    // Add locale-specific relative date/time formatting rules.
    TimeAgo.addLocale(en)

    // Create relative date/time formatter.
    const timeAgo = new TimeAgo('en-US')

    const WheatherCards = cards.map((card, index) =>
        <Card key={index}>
            <Card.Content> <Image
                floated='right'
                size='mini'
                src={`https://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`}
            />
                <Card.Header content={`Wheather in ${card.name}, ${card.sys.country}`} />
                <Card.Meta> {card.main.temp} &#176;C</Card.Meta>
                <div className="cityStorm"></div>
                <Card.Description>
                    The current wheather is <strong>{card.weather[0].main}</strong>
                </Card.Description>
                <br />
                <Card.Meta>
                    {new Intl.DateTimeFormat('en-GB', {
                        day:'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
                    }).format(new Date(card.dt * 1000))}
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button basic floated='right' color='blue' onClick={() => props.handleMethod(index)}>
                    View
                </Button>
            </Card.Content>
        </Card>
    );

    return (

        <Grid padded className='CardWrap'>
            <Grid.Column>
                <Card.Group>
                    {WheatherCards}
                </Card.Group>
            </Grid.Column>
        </Grid>
    )
}
export default Cardcontent;