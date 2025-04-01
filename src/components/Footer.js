import { Box, Container, Flex, Text, IconButton, Link } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" py={4} position={"sticky"}>
      <Container maxW="container.xl">
        <Flex justify="space-between" alignItems="center">
          <Text fontSize="sm" m={0}>
            &copy; {currentYear}{" "}
            <Link
              href={"https://govind-kurapati.com/"}
              target="_blank"
              outline={"none"}
            >
              Govind Kurapati
            </Link>
          </Text>

          <Flex gap={2}>
            <IconButton
              as={Link}
              href="https://github.com/GovindKurapati"
              aria-label="GitHub"
              variant="ghost"
              size="md"
              outline={"none"}
              target="_blank"
            >
              <FaGithub />
            </IconButton>

            <IconButton
              as={Link}
              href="https://www.linkedin.com/in/govind-kurapati/"
              aria-label="LinkedIn"
              variant="ghost"
              size="md"
              outline={"none"}
              target="_blank"
            >
              <FaLinkedin />
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
