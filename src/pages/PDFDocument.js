
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image as PDFImage
} from "@react-pdf/renderer";
import ws_special from '../assets/ws_special.png';
import no_ws_special from '../assets/no_ws.png';
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "#000",
        margin: 10,
        padding: 20
    },
    section: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // margin: 10,
        // padding: 10,

    },
    title: {
        fontSize: 22
    },
    viewer: {
        width: window.innerWidth * .5, //the pdf viewer will take up all of the width and height
        height: window.innerHeight * .5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 5
    },
    price: {
        fontSize: 60,
        paddingLeft: 20,
        fontWeight: "extrabold",
    },
    logo_view: {
        display: "flex",
        // justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    }
});
const dateTime = `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.now())}`;

const Image = ({ src = '' }) => {
    return (
        <PDFImage
            style={styles.image}
            src={src}
        />
    )
}

// Create Document Component
function BasicDocument({ title = '', price = '', pageSize = 'A6' }) {
    return (
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
                {/*render a single page*/}
                <Page size={pageSize} style={styles.page} orientation="landscape">
                    <View style={styles.section}>
                        <Text>{title}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.price}>{price}</Text>
                        <View style={styles.logo_view}>
                            <Image src={ws_special} />
                            <Image src={no_ws_special} />
                        </View>
                    </View>
                    <View>
                        <Text>{`${dateTime.split(',')[0]}`}</Text>
                        <Text style={{ paddingTop: 3 }}>{`${dateTime.split(',')[1]}`}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default BasicDocument;