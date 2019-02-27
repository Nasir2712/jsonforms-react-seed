import React from 'react';

import {
  ArrayControlProps,
  ControlElement,
  Helpers,
  isObjectArrayWithNesting,
  mapDispatchToArrayControlProps,
  mapStateToArrayControlProps,
  RankedTester,
  rankWith
} from '@jsonforms/core';
import { MaterialArrayLayout } from './MaterialArrayLayout';
import { connect } from 'react-redux';

export const MaterialArrayLayoutRenderer  = (
  {
    uischema,
    data,
    path,
    findUISchema,
    addItem,
    removeItems,
    errors,
    createDefaultValue,
    schema,
    rootSchema,
  }) => {

  const controlElement = uischema ;
  const labelDescription = Helpers.createLabelDescriptionFrom(controlElement);
  const label = labelDescription.show ? labelDescription.text : '';

  return (
    <MaterialArrayLayout
      data={data}
      label={label}
      path={path}
      addItem={addItem}
      removeItems={removeItems}
      findUISchema={findUISchema}
      uischema={uischema}
      schema={schema}
      errors={errors}
      rootSchema={rootSchema}
      createDefaultValue={createDefaultValue}
    />
  );
};

const ConnectedMaterialArrayLayoutRenderer = connect(
  mapStateToArrayControlProps,
  mapDispatchToArrayControlProps
)(MaterialArrayLayoutRenderer);

export default ConnectedMaterialArrayLayoutRenderer;
ConnectedMaterialArrayLayoutRenderer.displayName = 'MaterialArrayLayoutRenderer';

export const materialArrayLayoutTester = rankWith(4, isObjectArrayWithNesting);