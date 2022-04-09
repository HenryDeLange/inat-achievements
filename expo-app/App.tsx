import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
    return (
        <View style={styles.container}>
            <WebView
                style={styles.container}
                source={{ uri: 'https://wild-achievements.mywild.co.za' }}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
