import { TextField, BaseTextFieldProps, StandardTextFieldProps } from "@mui/material"
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form"

type ITextInputProps = {
    control: Control<FieldValues>,
    name: FieldPath<FieldValues>
} & (BaseTextFieldProps | StandardTextFieldProps)

function TextInput({ control, name, ...rest }: ITextInputProps) {
    return (
        <Controller 
            render={({field, fieldState: {error}}) => 
                <TextField 
                    {...field}
                    {...rest}
                    variant="outlined"
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                />
            }
            name={name}
            control={control}
            defaultValue=""
        />
    )
}

export default TextInput