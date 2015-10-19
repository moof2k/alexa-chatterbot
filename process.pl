#!/usr/bin/perl

print "var megahal = new jsMegaHal(4);\n\n";

$text = "";

while(<STDIN>) {
    $line = $_;

    @words = split(/ /, $line);

    # Skip if any word is all uppercase
    $skip = 0;
    foreach(@words) {
        $word = $_;
        $word =~ s/'s$//;
        if ($word eq uc $word) {
            $skip = 1;
        }
    }

    if ($skip == 1) {
        next;
    }

    chomp($line);
    $line =~ s/-/ /g;

    if ($line =~ /\ /) {
        $text .= $line . " ";

        if ($line =~ /\.$/) {
            print "megahal.add(\"" . $text . "\");\n";
            $text = "";
        }
        elsif ($line =~ /\,$/) {
            print "megahal.add(\"" . $text . "\");\n";
            $text = "";
        }
        elsif ($line =~ /\:$/) {
            print "megahal.add(\"" . $text . "\");\n";
            $text = "";
        }
        elsif ($line =~ /\!$/) {
            print "megahal.add(\"" . $text . "\");\n";
            $text = "";
        }
        elsif ($line =~ /\?/) {
            print "megahal.add(\"" . $text . "\");\n";
            $text = "";
        }
    }
}

