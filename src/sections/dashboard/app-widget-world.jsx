import PropTypes from 'prop-types';
import { useState, useCallback } from "react";

import { Stack } from "@mui/system";
import { Tab, Card, Tabs, Grid, Typography } from "@mui/material";

import Image from 'src/components/image';

export default function AppWidgetWorld({ tablist, ...other }) {
    const [currentTab, setCurrentTab] = useState('news');
  
    const handleChangeTab = useCallback((event, newValue) => {
      setCurrentTab(newValue);
    }, []);

  
    return (
      <Card {...other} sx={{p:1}}>
      
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {tablist.slice(0, 3).map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
          {tablist.slice(0, 3).map(
            (tab) =>
              tab.value === currentTab && (
                <Stack spacing={2} sx={{ p: 3 }} key={tab.value}>
                    <Grid container>
                      <Grid xs={12} md={9} spacing={1} container item >
                        <Grid>
                          <Typography variant="h" fontWeight="bold" color='black'>
                            Bitcoin is getting even dirtier in the market of virtual currency consectetur adipiscing elit, sed do eiusmod tempor
                          </Typography>
                        </Grid>
                        <Grid>
                          <Stack gap={2} direction='row'>
                              <Typography variant="h">
                                Business
                              </Typography>
                              <Typography variant="h">
                                5h ago
                              </Typography>
                              <Typography variant="h">
                                680 share
                              </Typography>
                          </Stack>
                        </Grid>

                      </Grid>
                      <Grid md={3} item>
                          <Image  src="/assets/images/news/coin1.png" sx={{ borderRadius: 2, maxWidth:"68%" }}  />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid md={9} spacing={1} container item >
                        <Grid>
                          <Typography variant="h" fontWeight="bold" color='black'>
                            Ethena Details ENA Airdrop for Shard Holders, Announces Bitcoin Sats Campaign
                          </Typography>
                        </Grid>
                        <Grid item >
                          <Stack gap={2} direction='row'>
                              <Typography variant="h">
                                Business
                              </Typography>
                              <Typography variant="h">
                                5h ago
                              </Typography>
                              <Typography variant="h">
                                680 share
                              </Typography>
                          </Stack>
                        </Grid>

                      </Grid>
                      <Grid md={3} item >
                          <Image  src="/assets/images/news/coin2.png" sx={{ borderRadius: 2 , maxWidth:"68%"}} />
                      </Grid>
                    </Grid>
                </Stack>
              )
          )}
      </Card>
    );
  }

  AppWidgetWorld.propTypes = {
    tablist: PropTypes.array
  };
  