export default function Editor({ editorRef }) {
    // const callEditor = () => {
    //     ClassicEditor
    //         .create(editorRef.current)
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    return <div ref={editorRef}></div>;
}
