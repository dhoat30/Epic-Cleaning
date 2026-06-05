export default function JsonLd({ data, idPrefix = 'jsonld' }) {
  const scripts = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);

  return scripts.map((item, index) => (
    <script
      key={`${idPrefix}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
