import PropTypes from 'prop-types';
import { useState, useCallback } from "react";

import { Box, Stack } from "@mui/system";
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Tab, Card, Tabs, Table, TableRow, TableCell, TableBody, CardHeader, ListItemText, TableContainer } from "@mui/material";

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

export default function IssuanceTracking({ tablist,title, ...other }) {
   
    const [currentTab, setCurrentTab] = useState('confirmed');
    const theme = useTheme();
    const lightMode = theme.palette.mode === 'light';
  
    const handleChangeTab = useCallback((event, newValue) => {
      setCurrentTab(newValue);
    }, []);
  
    return (
      <Card {...other} sx={{p:1}}>
        <CardHeader
        title={title}
       
      />
         <Box sx={{p:3}}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
               {tablist.slice(0, 4).map((tab) => (
               <Tab key={tab.value} value={tab.value} label={tab.label} />
               ))}
            </Tabs>
            {tablist.slice(0, 4).map(
               (tab) =>
               tab.value === currentTab && (
                  <Stack sx={{ p: 1 }} key={tab.value}>
                     <TableContainer sx={{ overflow: 'unset' }}  >
                           <Scrollbar>
                           <Table sx={{ minWidth: 720 }}>
                              <TableHeadCustom headLabel={[
                                    { id: 'issuanceId', label: 'Issuance Identification' },
                                    { id: 'distributorId', label: 'Distributor Identification' },
                                    { id: 'distributorSpread', label: 'Distributor Spread' },
                                    { id: 'clientIndexRate', label: 'Client Index Rate' },
                                    { id: 'quantity', label:"Quantity" },
                                    { id: 'price', label:"Price" },
                                    { id: 'tradedamount', label:"Traded Amount" },
                                    { id: 'issuestatus', label:"Issue Status" },
                                    { id: 'action', label:"Action" },
                              ]} sx={{color: "white"}} />

                              <TableBody>
                                 <TableRow>
                                       <TableCell>
                                       <ListItemText
                                          primary="CDB"
                                          primaryTypographyProps={{ typography: 'body2' }}
                                          secondaryTypographyProps={{
                                          mt: 0.5,
                                          component: 'span',
                                          typography: 'caption',
                                          }}
                                       />
                                       </TableCell>

                                       <TableCell>12</TableCell>

                                       <TableCell>
                                          06/01/2025
                                       </TableCell>
                                       <TableCell>
                                          R$2,000,000.00
                                       </TableCell>
                                       <TableCell>
                                          State ICO
                                       </TableCell>
                                       <TableCell>
                                          +4.6%
                                       </TableCell>
                                       <TableCell>
                                          +4.6%
                                       </TableCell>
                                       <TableCell>
                                          <Label
                                                variant={lightMode ? 'soft' : 'filled'}
                                                color="success"
                                             >
                                             Confirmed
                                          </Label>
                                       </TableCell>
                                       <TableCell>
                                          <Button variant="outlined">edit</Button>
                                       </TableCell>
                                 </TableRow>
                              </TableBody>
                           </Table>
                           </Scrollbar>
                     </TableContainer>
                  </Stack>
               )
            )}
         </Box>
      </Card>
    );
  }

  IssuanceTracking.propTypes = {
    tablist: PropTypes.array,
    title:PropTypes.string
  };
  