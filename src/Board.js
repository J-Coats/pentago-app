/*
*  Assignment: Pentago Project
*  Author: Jared Coats
*  CS 470 - Project 3
*  March 7th, 2023
*  Description: Implement the game Pentago using React and mui components. Follows rules of the
*  pentago game in which a player has to place a marble on a 6x6 board and then rotate one of the four
*  quadrants either clockwise or counter-clockwise. A quadrant is simply a 3x3 portion of the larger 6x6 board.
*
*    -- Note --   I didn't have time to implement a skip button last minute for the beginning stages of the game.
*                 If the user wishes to skip a rotation, they can simply choose to rotate one of the quadrants that
*                 will result in no changes.
*
 */


import {Fragment, useReducer} from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack'


import { click_on_cell_action, reset_action, button_clicked } from './actions';
import { reducers, createInitialState } from './reducers';

import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

const configAttributes = {
    num_rows: 6,
    num_columns: 6,
    h_gap:7,
    cell_width: 50,
    cell_height: 50
}


function Cell(props) {
    const { dispatch, cell, colIdx, activeRows, needsToRotate} = props;

    return (
        <Fragment>

                <Box sx={{
                    width: configAttributes.cell_width,
                    height: configAttributes.cell_height,
                    backgroundColor: cell['color'],
                    border: 1,
                    borderColor: 'black',
                    borderRadius: '50%'
                }}
                     onClick={() => dispatch(click_on_cell_action(colIdx, activeRows, needsToRotate))}
                />

        </Fragment>
    );
}

function Row(props) {
    const { dispatch, needsToRotate} = props;
    return (
        <Grid container
              conlumns={configAttributes.num_columns}
              sx={{
                  display: 'flex',
                  direction: 'flex-row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between'
              }}

        >
            {
                props.row.map((cell, idx) =>
                    <Grid item
                          key={idx}
                    >
                        <Cell key={idx}
                              cell={cell}
                              colIdx={idx}
                              activeRows={props.rowKey}
                              dispatch={dispatch}
                              needsToRotate={needsToRotate}
                        />
                    </Grid>)
            }
        </Grid>
    )
}



function TopButtons(props){

    // all these functions have dispatch to action with the quadrant location and direction of
    // rotation. Then that information is then handled by the reducer to handle the rotation
    function topLeftCounterClockwise() {
        props.dispatch(button_clicked('top_left', "counter_clockwise"))
    }

    function topLeftClockWise() {
        props.dispatch(button_clicked('top_left', "clockwise"))
    }

    function topRightCounterClockwise() {
        props.dispatch(button_clicked('top_right', "counter_clockwise"))
    }

    function topRightClockWise() {
        props.dispatch(button_clicked('top_right', "clockwise"))
    }


    return (
        < Grid >

            <Box textAlign={'center'}>

                <ButtonGroup variant="outlined"
                             sx = {{ mx: "auto", width: 100, justifyContent: 'center', mt : 2, mr: 8,
                                 mb: 2}}>

                    <IconButton sx={{color:"black",
                        bgcolor : '#D3D3D3',
                        border : '1',
                        width: '50%',
                        mr: 1,
                        ":hover" : {
                            bgcolor: '#cbcbcb'
                        }}}

                                onClick={() => {
                                    topLeftCounterClockwise()
                                }} >
                        <TurnLeftIcon  />
                    </IconButton>

                    <IconButton size={'medium'}
                                sx={{color:"white",
                                    bgcolor : 'black',
                                    size:'medium',
                                    width: '50%',
                                    ":hover" : {
                                        bgcolor: '#383838'
                                    }}}

                                onClick={() => {
                                    topLeftClockWise()
                                }} >
                        <TurnRightIcon />
                    </IconButton>

                </ButtonGroup>


                <ButtonGroup variant="outlined"
                             sx = {{ mx: "auto",
                                 width: 100,
                                 justifyContent: 'center',
                                 mt : 2,
                                 ml: 8}}>

                    <IconButton sx={{color:"black",
                        bgcolor : '#D3D3D3',
                        border : '1',
                        width: '50%',
                        mr: 1,
                        ":hover" : {
                            bgcolor: '#cbcbcb'
                        }}}

                                onClick={() => {
                                    topRightCounterClockwise()
                                }} >
                        <TurnLeftIcon  />
                    </IconButton>

                    <IconButton size={'medium'}
                                sx={{color:"white",
                                    bgcolor : 'black',
                                    size:'medium',
                                    width: '50%',
                                    ":hover" : {
                                        bgcolor: '#383838'
                                    }}}

                                onClick={() => {
                                    topRightClockWise()
                                }} >
                        <TurnRightIcon />
                    </IconButton>

                </ButtonGroup>

            </Box>
        </Grid>
    );
}

function BottomButtons(props){

    // all these functions have dispatch to action with the quadrant location and direction of
    // rotation. Then that information is then handled by the reducer to handle the rotation

    function bottomLeftCounterClockwise() {
        props.dispatch(button_clicked('bottom_left', "counter_clockwise"))
    }

    function bottomLeftClockWise() {
        props.dispatch(button_clicked('bottom_left', "clockwise"))
    }

    function bottomRightCounterClockwise() {
        props.dispatch(button_clicked('bottom_right', "counter_clockwise"))
    }

    function bottomRightClockWise() {
        props.dispatch(button_clicked('bottom_right', "clockwise"))
    }

    return (
        < Grid >

            <Box textAlign={'center'}>

                <ButtonGroup variant="outlined"
                             sx = {{ mx: "auto",
                                 width: 100,
                                 justifyContent: 'center',
                                 mt : 2, mr: 8,
                                 mb: 2}}>

                    <IconButton sx={{color:"black",
                        bgcolor : '#D3D3D3',
                        border : '1',
                        width: '50%',
                        mr: 1,
                        ":hover" : {
                            bgcolor: '#cbcbcb'
                        }}}

                                onClick={() => {
                                    bottomLeftCounterClockwise();
                                }} >
                        <TurnLeftIcon  />
                    </IconButton>

                    <IconButton size={'medium'}
                                sx={{color:"white",
                                    bgcolor : 'black',
                                    size:'medium',
                                    width: '50%',
                                    ":hover" : {
                                        bgcolor: '#383838'
                                    }}}

                                onClick={() => {
                                    bottomLeftClockWise()
                                }} >
                        <TurnRightIcon />
                    </IconButton>

                </ButtonGroup>


                <ButtonGroup variant="outlined"
                             sx = {{ mx: "auto",
                                 width: 100,
                                 justifyContent: 'center',
                                 mt : 2,
                                 ml: 8}}>

                    <IconButton sx={{color:"black",
                        bgcolor : '#D3D3D3',
                        border : '1',
                        width: '50%',
                        mr: 1,
                        ":hover" : {
                            bgcolor: '#cbcbcb'
                        }}}

                                onClick={() => {
                                    bottomRightCounterClockwise()
                                }} >

                        <TurnLeftIcon  />
                    </IconButton>

                    <IconButton size={'medium'}
                                sx={{color:"white",
                                    bgcolor : 'black',
                                    size:'medium',
                                    width: '50%',
                                    ":hover" : {
                                        bgcolor: '#383838'
                                    }}}

                                onClick={() => {
                                    bottomRightClockWise()
                                }} >
                        <TurnRightIcon />
                    </IconButton>

                </ButtonGroup>

            </Box>
        </Grid>
    );
}




function TopMessage(props) {

    const {haveAWinner, winnerColor, needsToRotate} = props;
    const playerColor = props.nextColor.charAt(0).toUpperCase() + props.nextColor.slice(1);
    let colorOfWinner;

    if (winnerColor) {
        colorOfWinner = winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1);
    } else {
        colorOfWinner = null;
    }
    function Display() {
        // updates display message based on what player has to do next
        if (haveAWinner) {
            return `${colorOfWinner} Wins. Play again?`
        } else {
            if (needsToRotate) {
                return `${playerColor}, what quadrant will you rotate?`
            } else {
                return `It's your turn now, ${playerColor}`
            }
        }
    }

    // two different return statements because we only want reset button to display if we have a winner
    if (haveAWinner) {
        return (
            <Stack width='100%'>
                <Typography variant='h6' textAlign='center'>
                    {
                        Display()
                    }
                </Typography>
                <Button variant="outlined" size={"small"}
                        sx={{
                            width: '50%',
                            fontWeight: 'bold',
                            ml: 7,
                            mt: 2,
                            justifyContent: 'center',
                            bgcolor: '#ADD8E6',
                            color: 'black',
                            textTransform: 'none',
                            ":hover" : {
                                bgcolor: '#77C3EC'
                            }


                        }}
                        onClick={() => props.dispatch(reset_action())}>Reset
                </Button>
            </Stack>
        )
    } else {
        return (
            <Stack width='100%'>

                <Typography variant='h6' textAlign='center'>
                    {
                        Display()
                    }
                </Typography>

            </Stack>
        )
    }

}



export default function Board() {
    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);
    const { board,
        haveAWinner,
        nextColor,
        winnerColor,
        needsToRotate} = state;
    const calcWidth = () => (configAttributes.num_columns * configAttributes.cell_width +
        (configAttributes.num_columns - 1) * configAttributes.h_gap) + 5

    return (

        <Fragment>

            <Typography variant='h5' textAlign='center' fontWeight={"bold"} sx={{mt: 5}}>
                -- Pentago --
            </Typography>

            <Grid container margin='auto'
                  columns={1}
                  zIndex={10}
                  sx={{
                      width: calcWidth(),
                      margin: 'auto',
                      justifyContent: 'center',
                      mt: 7
                  }}
            >
                <Grid item sx={{mb: 2}}>
                    <TopMessage haveAWinner={haveAWinner}
                                nextColor={nextColor}
                                winnerColor={winnerColor}
                                needsToRotate={needsToRotate}
                                dispatch={dispatch}
                    />
                </Grid>
                <Grid >
                    <TopButtons
                        dispatch={dispatch}
                    />

                </Grid>
                <Grid container margin='auto'
                      columns={1}
                      sx={{
                          backgroundColor: '#D3D3D3',
                      }}
                >
                    {
                        board.map((row, rowIdx) => (
                            <Grid item
                                  key={rowIdx}
                                  width='100%'
                                  sx={{mb: 1}}
                                  xs={1}
                            >
                                <Row key={rowIdx}
                                     row={row}
                                     rowKey={rowIdx}
                                     dispatch={dispatch}
                                     needsToRotate={needsToRotate}
                                />
                            </Grid>))
                    }
                </Grid>
                <Grid>
                    <BottomButtons
                        dispatch={dispatch}
                    />
                </Grid>
            </Grid>


        </Fragment>

    );
}