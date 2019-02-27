import find from 'lodash/find';
import map from 'lodash/map';
import React from 'react';
import { ArrayControlProps, composePaths } from '@jsonforms/core';
import { ResolvedJsonForms } from '@jsonforms/react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Grid, Hidden, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
// import ValidationIcon from '../complex/ValidationIcon';

export const MaterialArrayLayout =
  ({
     data,
     path,
     label,
     schema,
     createDefaultValue,
     uischema,
     errors,
     addItem,
     findUISchema,
     removeItems
   }) => {

    const firstPrimitiveProp = schema.properties ? find(Object.keys(schema.properties), propName => {
      const prop = schema.properties[propName];
      return prop.type === 'string' ||
        prop.type === 'number' ||
        prop.type === 'integer';
    }) : undefined;

    return (
      <Paper style={{ padding: 10 }}>
        <Toolbar>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item>
              <Typography variant={'headline'}>{label}</Typography>
            </Grid>
            <Hidden smUp={errors.length === 0}>
              <Grid item>
                {/* <ValidationIcon id='tooltip-validation' errorMessages={errors}/> */}
              </Grid>
            </Hidden>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Tooltip
                    id='tooltip-add'
                    title={`Add to ${label}`}
                    placement='bottom'
                  >
                    <IconButton
                      aria-label={`Add to ${label}`}
                      onClick={addItem(path, createDefaultValue())}
                    >
                      <AddIcon/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <div>
          {
            data ? map(data, (childData, index) => {

              const foundUISchema =
                findUISchema(schema, uischema.scope, path, undefined, uischema);
              const childPath = composePaths(path, `${index}`);
              const childLabel = firstPrimitiveProp ? childData[firstPrimitiveProp] : '';

              return (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container alignItems={'center'}>
                      <Grid item xs={11}>
                        <Grid container alignItems={'center'}>
                          <Grid item xs={1}>
                            <Avatar aria-label='Index'>
                              {index + 1}
                            </Avatar>
                          </Grid>
                          <Grid item xs={2}>
                            {childLabel}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1}>
                        <Grid container justify={'flex-end'}>
                          <Grid item>
                            <IconButton
                              onClick={removeItems(path, [data[index]])}
                              style={{ float: 'right' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ResolvedJsonForms
                      scopedSchema={schema}
                      uischema={foundUISchema}
                      path={childPath}
                      key={childPath}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            }) : <p>No data</p>
          }
        </div>
      </Paper>
    );
  };