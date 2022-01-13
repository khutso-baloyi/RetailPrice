import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { Input } from './Input'

export const FormInput = (props) => {
  const { name, rules, defaultValue='', ...inputProps } = props;
 

  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({ name, control, rules, defaultValue })

  return (
    
    <Input
      {...inputProps}
      error={errors[name]?.message}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  )
}


