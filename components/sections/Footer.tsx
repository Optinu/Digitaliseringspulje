import { Container } from "@/components/ui/container";
import { content } from "@/lib/content";

export function Footer() {
  const contactInfo = content.footer.contact;
  
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <Container>
        {contactInfo && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 text-foreground">
              {contactInfo.title}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-foreground transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {contactInfo.email}
                </a>
              </p>
              <p>{contactInfo.address}</p>
              <p>{contactInfo.cvr}</p>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {content.footer.copyright}
          </p>
          <div className="flex gap-6">
            {content.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
