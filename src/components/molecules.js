import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PageHead from './page-head';
import PageBody from './page-body';
import CardComponent from './item-card';
import { formatFormula } from '../utils/formulas';
import { has } from 'lodash-es';

const styles = theme => ({
  grid: {
    marginTop: 1.5 * theme.spacing.unit,
    marginBottom: 1.5 * theme.spacing.unit
  }
});

class Molecules extends Component {

  getName(molecule) {
    if (molecule.name)
      return molecule.name;
    else if (molecule.properties.formula)
      return formatFormula(molecule.properties.formula);
    return 'Molecule';
  }

  render = () => {
    const {molecules, onOpen, before, after, classes} = this.props;

    return (
      <div>
        <PageHead>
          <Typography  color="inherit" gutterBottom variant="display1">
            Molecules
          </Typography>
          <Typography variant="subheading" paragraph color="inherit">
          </Typography>
        </PageHead>
        <PageBody>
          {before}
          <Grid container spacing={24} className={classes.grid}>
            {
              molecules.map(molecule => {
                const title = this.getName(molecule);
                const image = `${window.location.origin}/api/v1/molecules/${molecule._id}/svg`;
                const properties = [];
                if (has(molecule, 'properties.atomCount')) {
                  properties.push({label: 'Atoms', value: molecule.properties.atomCount});
                }
                if (has(molecule, 'properties.mass')) {
                  properties.push({label: 'Mass', value: molecule.properties.mass.toFixed(2)});
                }

                return (
                  <Grid key={molecule._id} item xs={12} sm={6} md={4} lg={3}>
                    <CardComponent
                      title={title}
                      properties={properties}
                      image={image}
                      onOpen={() => {onOpen(molecule.inchikey)}}/>
                  </Grid>
                )
              })
            }
          </Grid>
          {after}
        </PageBody>
      </div>
    );
  }
}

Molecules.propTypes = {
  molecules: PropTypes.array,
  onOpen: PropTypes.func
}

Molecules.defaultProps = {
  molecules: [],
  onOpen: () => null
}

export default withStyles(styles)(Molecules);
