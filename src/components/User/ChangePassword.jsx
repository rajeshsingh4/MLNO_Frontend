import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

const ChangePassword = (props) => {
    const [passwordForm, setPasswordForm] = React.useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
        console.log('formdata')
        const { name, value } = e.target;
        setPasswordForm({
            ...passwordForm,
            [name]: value
        });
    }

    const handlePasswordUpdate = () => {
        console.log('formData', passwordForm);
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        // API integration
    }

    return (
        <Card variant="outlined">
            <CardHeader
                title={
                    <Typography component="h5">
                        Change Password
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <TextField
                            id="current-password"
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            onChange={(e) => handlePasswordChange(e)}
                            value={passwordForm.currentPassword}
                            required
                            fullWidth
                        />
                    </Grid>
                    <br />
                    <Grid xs={12} sm={6}>
                        <TextField
                            id="new-password"
                            name="newPassword"
                            label="New Password"
                            type="password"
                            onChange={(e) => handlePasswordChange(e)}
                            value={passwordForm.newPassword}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            id="confirm-password"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            error={passwordForm.newPassword !== passwordForm.confirmPassword}
                            onChange={(e) => handlePasswordChange(e)}
                            value={passwordForm.confirmPassword}
                            helperText={passwordForm.newPassword !== passwordForm.confirmPassword ? 'Password does not match' : ''}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
                <Button variant="contained" onClick={handlePasswordUpdate}>Change Password</Button>
            </CardActions>
        </Card>
    )
}

export default ChangePassword;