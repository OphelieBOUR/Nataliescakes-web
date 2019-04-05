import React from 'react';
import {Form, Icon, Input, Button,} from 'antd';
import { DatePicker,InputNumber } from 'antd';
import {Upload} from 'antd';


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function onChange(e) {  console.log(`checked = ${e.target.checked}`);}



class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // Pour desactiver le bouton submit au début
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Valeurs reçues du formulaire ', values);
            }
        });
    }



    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const { TextArea } = Input;
        const { RangePicker} = DatePicker;

        /*Création du formulaire*/
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        return (


            <Form labelCol={{ span: 6}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
                <Form.Item label="Nom de la recette"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('nom', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <Input/>
                    )}

                </Form.Item>

                <Form.Item label="Type"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <Input/>
                    )}

                </Form.Item>

                <Form.Item label="Ingrédients"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('ingredient', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <Input/>
                    )}

                </Form.Item>

                <Form.Item label="Temps de préparation"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('preparation', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <InputNumber/>
                    )}

                </Form.Item>

                <Form.Item label="Temps de cuison"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('cuisson', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <InputNumber/>
                    )}

                </Form.Item>

                <Form.Item label="Difficulté"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('difficulté', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <InputNumber/>
                    )}

                </Form.Item>

                <Form.Item label="Nombre de personnes"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('personnes', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <InputNumber/>
                    )}

                </Form.Item>

                <Form.Item label="Tags"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('tags', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <Input/>
                    )}

                </Form.Item>

                <Form.Item label="Matériel"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('materiel', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <Input/>
                    )}

                </Form.Item>

                <Form.Item label="Commentaire"
                           validateStatus={userNameError ? 'error' : ''}
                           help={userNameError || ''}
                >
                    {getFieldDecorator('commentaire', {
                        rules: [{ required: true, message: 'Remplissez ce champ svp' }],
                    })(
                        <TextArea/>
                    )}

                </Form.Item>


                <Form.Item label="Photo">
                    <Upload>
                        <Button>
                            <Icon type="upload" /> Uploader une photo
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Save
                    </Button>&nbsp;&nbsp;
                    <Button style={{marginLeft: 8}}
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                    >
                        Cancel
                    </Button>
                </Form.Item>


            </Form>
        );
    }
}



const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);


export default WrappedHorizontalLoginForm
