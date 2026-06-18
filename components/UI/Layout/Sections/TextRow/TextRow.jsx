import styles from './TextRow.module.scss'
import Container from '@mui/material/Container';
function TextRow({title, description}) {
  return (
    <section className={styles.section}>
        <Container maxWidth="xl" className={`${styles.container} grid gap-80 align-start`}> 
        <div className={`${styles.title} heading2 mt-16` }    dangerouslySetInnerHTML={{ __html: title }}/>
          <div className={`${styles.description} heading5 mt-16` }    dangerouslySetInnerHTML={{ __html: description }}/>
</Container>
    </section>
  )
}

export default TextRow
